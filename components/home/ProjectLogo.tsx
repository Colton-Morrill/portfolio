import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createLogoShapes } from '@/lib/projectLogoGeometry';
import { logoLighting } from '@/lib/logoLighting';

// Related accents are confined to the tunnel; each outer outline keeps its brand color.
const tunnelAccents:Record<string,string>={
  'fund-launch':'#53dfff',
  'press-sports':'#a58aff',
  'vibility':'#e38bff',
  'aptogenix':'#719eff',
};

const vertexShader = `
varying vec3 vPosition, vNormal, vView;
void main(){
  vPosition=position;
  vNormal=normalize(normalMatrix*normal);
  vec4 view=modelViewMatrix*vec4(position,1.);
  vView=normalize(-view.xyz);
  gl_Position=projectionMatrix*view;
}`;
const palette = `
uniform vec3 uColor;
uniform float uTime;
vec3 lightColor(vec2 p){ return uColor; }
`;
// Interpolate a fixed noise field as it drifts, avoiding frame-by-frame static.
const printGrain = `
uniform float uPixelRatio;
float grainHash(vec2 cell){
  vec3 p=fract(vec3(cell.xyx)*.1031);
  p+=dot(p,p.yzx+33.33);
  return fract((p.x+p.y)*p.z);
}
float paperGrain(vec2 drift){
  vec2 point=gl_FragCoord.xy/uPixelRatio-drift;
  vec2 cell=floor(point),f=fract(point);
  f=f*f*(3.-2.*f);
  return mix(mix(grainHash(cell),grainHash(cell+vec2(1.,0.)),f.x),
             mix(grainHash(cell+vec2(0.,1.)),grainHash(cell+vec2(1.,1.)),f.x),f.y)*2.-1.;
}
`;
const viewportFade = `
uniform vec2 uViewport;
float canvasFade(){
  vec2 uv=gl_FragCoord.xy/uViewport;
  vec2 fade=smoothstep(vec2(0.),vec2(.08),min(uv,1.-uv));
  return fade.x*fade.y;
}
`;
const fragmentShader = `
varying vec3 vPosition,vNormal,vView;
uniform sampler2D uMask;
uniform float uSweep,uCharge;
uniform vec3 uAccent;
${palette}
void main(){
  vec2 uv=vPosition.xy/5.4+.5;
  float d=(texture2D(uMask,uv).r-.502)*2.;
  vec3 n=normalize(vNormal);
  float side=1.-abs(n.z);
  float fresnel=pow(1.-max(dot(n,normalize(vView)),0.),2.);
  float edge=exp(-abs(d)/.013);
  float sweepX=mix(-3.4,3.4,uSweep);
  float diagonal=vPosition.x*.83+vPosition.y*.55;
  float glint=exp(-pow((diagonal-sweepX)/.13,2.));
  float wash=exp(-pow((diagonal-sweepX)/.6,2.));
  float restingGlint=exp(-pow((diagonal+.95)/.45,2.));
  float charge=smoothstep(-.35,.5,mix(-3.7,3.7,uCharge)-diagonal);
  vec3 hue=lightColor(vPosition.xy);
  float lambert=max(dot(n,normalize(vec3(-.45,.65,1.))),0.);
  vec3 smoked=vec3(.009,.009,.012)+vec3(.012,.012,.016)*lambert;
  smoked+=vec3(.04)*fresnel;
  vec3 reflection=vec3(1.)*glint*(.17+side*.7+edge*.8);
  reflection+=lightColor(vPosition.xy)*.16*wash*(side+.15);
  // The object keeps a quiet reflected sheen even before neon ignition.
  reflection+=vec3(.32)*restingGlint*(.025+side*.08+edge*.07);
  reflection+=vec3(.045)*(edge*.14+side*.055);
  // Receding contour reflections suggest an infinity mirror within the body.
  vec3 echoes=vec3(0.);
  for(int i=1;i<=5;i++){
    float layer=float(i);
    float scale=1.-layer*.024;
    vec2 reflectedUv=(vPosition.xy+vec2(layer*.009,-layer*.012))/(5.4*scale)+.5;
    float reflectedDistance=(texture2D(uMask,reflectedUv).r-.502)*2.;
    // A localized accent travels across the contours and staggers inward.
    // Real hue separation makes movement readable against the steady bright core.
    float wave=pow(.5+.5*cos(uTime*.392699-layer*.9+vPosition.y*.85+vPosition.x*.5),4.);
    vec3 tint=mix(hue,uAccent,wave*.92);
    float line=exp(-abs(reflectedDistance)/.008);
    float soft=exp(-abs(reflectedDistance)/.019)*.18;
    echoes+=tint*(line+soft)*pow(.74,layer)*(.72+wave*.65);
  }
  float core=exp(-abs(d)/.0045);
  vec3 emission=charge*(hue*(.055+edge*.95+side*.48)+mix(hue,vec3(1.),.32)*core*.48+echoes*.68);
  vec3 color=smoked+reflection+emission;
  // A faint cool inner sheen reveals the continuous, polished body.
  color+=hue*charge*.055*pow(max(dot(n,normalize(vec3(.4,.3,1.))),0.),4.);
  gl_FragColor=vec4(color,1.);
}`;
const glowFragment = `
varying vec2 vUv;
uniform sampler2D uMask;
uniform float uCharge;
uniform vec3 uCursor;
${palette}
${viewportFade}
${printGrain}
void main(){
  vec2 p=(vUv-.5)*5.4;
  float d=(texture2D(uMask,vUv).r-.502)*2.;
  float diagonal=p.x*.83+p.y*.55;
  float charge=smoothstep(-.35,.5,mix(-3.7,3.7,uCharge)-diagonal);
  // Separate falloffs keep the source crisp and the surrounding spill soft.
  float halo=exp(-abs(d)/.022)*.3+exp(-abs(d)/.075)*.32+exp(-abs(d)/.22)*.065;
  // Concentrate the printed texture near the source and soften the outer halo.
  float grainFalloff=smoothstep(.003,.012,abs(d))*exp(-abs(d)/.065);
  // The distance-field gradient points away from each contour, including cutouts.
  vec2 texel=vec2(1./1024.,0.);
  vec2 gradient=vec2(
    texture2D(uMask,vUv+texel.xy).r-texture2D(uMask,vUv-texel.xy).r,
    texture2D(uMask,vUv+texel.yx).r-texture2D(uMask,vUv-texel.yx).r);
  vec2 outward=gradient/max(length(gradient),.0001);
  vec2 drift=outward*uTime*6.+vec2(sin(p.y*7.+uTime*.65)*1.2,uTime*2.);
  // Displace only the grain field: the steady light beneath it stays intact.
  vec2 cursorDelta=(gl_FragCoord.xy/uViewport-uCursor.xy)*uViewport/uPixelRatio;
  float cursorDistance=length(cursorDelta);
  float repulsion=1.-smoothstep(0.,90.,cursorDistance);
  drift+=cursorDelta/max(cursorDistance,1.)*repulsion*repulsion*30.*uCursor.z;
  halo*=1.+paperGrain(drift)*.75*grainFalloff;
  float clip=1.-smoothstep(.42,.5,max(abs(vUv.x-.5),abs(vUv.y-.5)));
  gl_FragColor=vec4(lightColor(p),halo*charge*clip*canvasFade());
}`;

const dustVertex = `
uniform sampler2D uMask;
uniform float uTime,uCharge,uPixelRatio;
attribute float aSeed;
varying float vLight,vSoftness;
void main(){
  vec3 p=position;
  p.xy+=vec2(sin(uTime*.18+aSeed*17.),cos(uTime*.14+aSeed*23.))*.18;
  p.z+=sin(uTime*.11+aSeed*29.)*.08;
  float d=abs((texture2D(uMask,p.xy/5.4+.5).r-.502)*2.);
  float diagonal=p.x*.83+p.y*.55;
  float charge=smoothstep(-.35,.5,mix(-3.7,3.7,uCharge)-diagonal);
  vLight=exp(-d/.15)*charge*(.16+aSeed*.17);
  vSoftness=aSeed;
  vec4 view=modelViewMatrix*vec4(p,1.);
  gl_Position=projectionMatrix*view;
  gl_PointSize=uPixelRatio*mix(1.4,3.8,aSeed)*clamp(8./-view.z,.6,1.4);
}`;
const dustFragment = `
uniform vec3 uColor;
varying float vLight,vSoftness;
${viewportFade}
void main(){
  float r=length(gl_PointCoord-.5)*2.;
  float alpha=(1.-smoothstep(mix(.15,0.,vSoftness),1.,r))*vLight;
  gl_FragColor=vec4(mix(uColor,vec3(1.),.28),alpha*canvasFade());
}`;

/** Only the identity is rendered in WebGL. The project card is independent HTML. */
export default function ProjectLogo({identity,color,progress,still=false,ambientMotion=true,onReady,onFailure}:{identity:string;color:string;progress:number;still?:boolean;ambientMotion?:boolean;onReady?:()=>void;onFailure?:()=>void}) {
  const host=useRef<HTMLDivElement>(null);
  const current=useRef({progress,still,ambientMotion,onReady,onFailure});
  const invalidate=useRef<()=>void>(()=>{});
  useEffect(()=>{current.current={progress,still,ambientMotion,onReady,onFailure};invalidate.current();},[progress,still,ambientMotion,onReady,onFailure]);
  useEffect(()=>{
    const node=host.current;
    if(!node)return;
    let renderer:THREE.WebGLRenderer;
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
    catch { const timer=window.setTimeout(()=>current.current.onFailure?.(),0); return ()=>clearTimeout(timer); }
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.setClearColor(0x000000,0);
    renderer.debug.onShaderError=()=>current.current.onFailure?.();
    node.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(35,1,.1,30);
    camera.position.z=9.6;
    const accent=tunnelAccents[identity]??color;
    const uniforms={uMask:{value:null as THREE.Texture|null},uSweep:{value:0},uCharge:{value:0},uTime:{value:0},uCursor:{value:new THREE.Vector3(.5,.5,0)},uViewport:{value:new THREE.Vector2(1,1)},uPixelRatio:{value:renderer.getPixelRatio()},uColor:{value:new THREE.Vector3(...[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)/255))},uAccent:{value:new THREE.Vector3(...[1,3,5].map(i=>parseInt(accent.slice(i,i+2),16)/255))}};
    const material=new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms});
    const glowMaterial=new THREE.ShaderMaterial({
      vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:glowFragment,uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    });
    const group=new THREE.Group();scene.add(group);
    const glowGeometry=new THREE.PlaneGeometry(5.4,5.4);
    const glow=new THREE.Mesh(glowGeometry,glowMaterial);glow.position.z=-.15;group.add(glow);
    // Fixed, deterministic point cloud: drift and illumination happen entirely on the GPU.
    const dustGeometry=new THREE.BufferGeometry();
    const positions=new Float32Array(36*3),seeds=new Float32Array(36);
    for(let i=0;i<36;i++){
      const seed=((i*73+19)%101)/101;
      positions[i*3]=(((i*37+11)%97)/97-.5)*4.9;
      positions[i*3+1]=(((i*53+7)%89)/89-.5)*4.9;
      positions[i*3+2]=.18+seed*.55;
      seeds[i]=seed;
    }
    dustGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    dustGeometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,1));
    const dustMaterial=new THREE.ShaderMaterial({vertexShader:dustVertex,fragmentShader:dustFragment,uniforms,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
    const dust=new THREE.Points(dustGeometry,dustMaterial);dust.frustumCulled=false;group.add(dust);
    let geometry:THREE.ExtrudeGeometry|undefined,texture:THREE.Texture|undefined,disposed=false;
    let dirty=true;
    let wake=()=>{};
    let markWidth=4.9,markHeight=3.1;
    const fit=()=>{
      const w=node.clientWidth,h=node.clientHeight;if(!w||!h)return;
      renderer.setSize(w,h);camera.aspect=w/h;
      renderer.getDrawingBufferSize(uniforms.uViewport.value);
      const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
      // Match the longest visible dimension in a square stage across all identities.
      camera.position.z=Math.max(markHeight,markWidth)/(2*tangent*Math.min(1,camera.aspect))*1.28;
      camera.updateProjectionMatrix();wake();
    };
    const abort=new AbortController();
    const load=async()=>{
      try {
        const [response,mask]=await Promise.all([
          fetch(`/projects/${identity}-contours.json`,{signal:abort.signal}),
          new THREE.TextureLoader().loadAsync(`/projects/${identity}-distance.png`).then(mask=>{
            if(disposed)mask.dispose();else texture=mask;
            return mask;
          }),
        ]);
        if(disposed)return;
        if(!response.ok)throw new Error('Logo contour unavailable');
        const contours=await response.json() as number[][][];
        if(disposed){mask.dispose();return;}
        geometry=new THREE.ExtrudeGeometry(createLogoShapes(contours,identity==='fund-launch'),{depth:.12,bevelEnabled:true,bevelSegments:4,bevelThickness:.035,bevelSize:.025,curveSegments:3,steps:1});
        geometry.translate(0,0,-.06);
        geometry.computeBoundingBox();
        const bounds=geometry.boundingBox!;
        markWidth=bounds.max.x-bounds.min.x;markHeight=bounds.max.y-bounds.min.y;
        group.position.set(-(bounds.max.x+bounds.min.x)/2,-(bounds.max.y+bounds.min.y)/2,0);
        fit();
        const mesh=new THREE.Mesh(geometry,material);group.add(mesh);
        uniforms.uMask.value=mask;
        node.dataset.ready='true';wake();current.current.onReady?.();
      } catch {if(!disposed){node.dataset.ready='fallback';glow.visible=false;current.current.onFailure?.();}}
    };
    void load();
    const resize=new ResizeObserver(fit);resize.observe(node);
    let contextLost=false;
    const onContextLost=(event:Event)=>{event.preventDefault();contextLost=true;suspend();current.current.onFailure?.();};
    renderer.domElement.addEventListener('webglcontextlost',onContextLost);
    let visible=false;
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else suspend();});observer.observe(node);
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const pointer=new THREE.Vector2();
    const cursorTarget=new THREE.Vector3(.5,.5,0);
    const onPointer=(event:PointerEvent)=>{
      if(event.pointerType!=='mouse'||current.current.still||reduced.matches||!current.current.ambientMotion)return;
      const b=node.getBoundingClientRect();
      if(!b.width||!b.height)return;
      const x=(event.clientX-b.left)/b.width,y=1-(event.clientY-b.top)/b.height;
      cursorTarget.set(x,y,x>=0&&x<=1&&y>=0&&y<=1?1:0);
      pointer.set(THREE.MathUtils.clamp((event.clientX-b.left)/b.width*2-1,-1,1),THREE.MathUtils.clamp((event.clientY-b.top)/b.height*2-1,-1,1));wake();
    };
    const onLeave=()=>{pointer.set(0,0);cursorTarget.z=0;if(!current.current.still&&!reduced.matches)wake();};
    const parent=node.closest('section');
    parent?.addEventListener('pointermove',onPointer as EventListener);
    parent?.addEventListener('pointerleave',onLeave);
    let frame=0,previous=-1,last=0,lastRender=0,activeTime=0;
    const suspend=()=>{cancelAnimationFrame(frame);frame=0;last=0;};
    wake=()=>{
      dirty=true;
      if(!disposed&&!contextLost&&visible&&!document.hidden&&uniforms.uMask.value&&!frame)frame=requestAnimationFrame(draw);
    };
    invalidate.current=wake;
    const onVisibility=()=>{if(document.hidden)suspend();else wake();};
    document.addEventListener('visibilitychange',onVisibility);
    reduced.addEventListener('change',wake);
    const draw=(now:number)=>{
      frame=0;
      if(disposed||contextLost||!visible||document.hidden||!uniforms.uMask.value){last=0;return;}
      const dt=last?Math.min((now-last)/1000,.05):0;last=now;
      const c=current.current;
      const stationary=c.still||reduced.matches;
      const progress=stationary?1:c.progress;
      if(progress!==previous){dirty=true;previous=progress;}
      const lighting=logoLighting(progress);
      uniforms.uSweep.value=lighting.sweep;
      uniforms.uCharge.value=lighting.charge;
      const ambient=!stationary&&c.ambientMotion&&uniforms.uCharge.value>0;
      if(ambient)activeTime+=dt;
      uniforms.uTime.value=stationary?0:activeTime;
      const rotation=stationary?0:THREE.MathUtils.lerp(-.32,.035,THREE.MathUtils.smoothstep(progress,0,.5))+pointer.x*.025;
      const ease=1-Math.exp(-dt*9);
      const cursor=uniforms.uCursor.value;
      if(stationary){cursor.z=0;cursorTarget.z=0;}
      else {
        // Follow the mouse promptly; let the displaced texture settle more slowly.
        cursor.x=cursorTarget.x;cursor.y=cursorTarget.y;
        cursor.z+=(cursorTarget.z-cursor.z)*(1-Math.exp(-dt*(cursorTarget.z?12:4)));
      }
      const delta=rotation-group.rotation.y;
      const x=stationary?0:pointer.y*.016;
      const moving=!stationary&&(Math.abs(delta)>.0001||Math.abs(x-group.rotation.x)>.0001);
      if(stationary){group.rotation.set(0,0,0);}
      else if(moving){group.rotation.y+=delta*ease;group.rotation.x+=(x-group.rotation.x)*ease;dirty=true;}
      // Ambient-only frames are capped at 30 fps; input/reveal changes render immediately.
      if(dirty||(ambient&&now-lastRender>=1000/30)){renderer.render(scene,camera);dirty=false;lastRender=now;}
      if(ambient||moving)frame=requestAnimationFrame(draw);else last=0;
    };
    wake();
    return()=>{
      disposed=true;abort.abort();suspend();resize.disconnect();observer.disconnect();invalidate.current=()=>{};
      document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',wake);
      parent?.removeEventListener('pointermove',onPointer as EventListener);parent?.removeEventListener('pointerleave',onLeave);
      renderer.domElement.removeEventListener('webglcontextlost',onContextLost);
      geometry?.dispose();glowGeometry.dispose();dustGeometry.dispose();dustMaterial.dispose();material.dispose();glowMaterial.dispose();texture?.dispose();renderer.dispose();renderer.domElement.remove();
    };
  },[identity,color]);
  return <div ref={host} style={{width:'100%',height:'100%'}} aria-hidden="true"/>;
}
