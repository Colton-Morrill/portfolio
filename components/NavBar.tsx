import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Projects", href: "#projects", current: false },
  { name: "About Me", href: "#about-me", current: false },
  { name: "Experience", href: "#experience", current: false },
  { name: "Contact", href: "#contact", current: false },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="nav-load fixed inset-x-0 top-2 z-50 sm:top-4" id="home">
      {({ open }) => (
        <>
          <div className="section-shell">
            <div className="relative mx-auto overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(18,26,46,0.82)_0%,rgba(10,16,32,0.66)_100%)] shadow-[0_16px_42px_rgba(2,6,23,0.2)] backdrop-blur-md">
              <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.07)_18%,rgba(255,255,255,0.02)_42%,rgba(129,140,248,0.1)_70%,rgba(56,189,248,0.08)_100%)] opacity-80" />
              <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.45rem-1px)] bg-[linear-gradient(180deg,rgba(14,21,39,0.88)_0%,rgba(8,13,28,0.72)_100%)]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.34)_18%,rgba(255,255,255,0.12)_52%,rgba(255,255,255,0)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_78%_-30%,rgba(129,140,248,0.1),transparent_34%)]" />

              <div className="relative flex h-[56px] items-center justify-between px-4 sm:px-5">
                <div className="absolute inset-y-0 left-4 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center justify-center sm:justify-between">
                  <Link href="/" className="flex shrink-0 items-center">
                    <Image
                      className="block h-8 w-auto opacity-95 transition hover:opacity-100 lg:hidden"
                      src="/cm-logo-01.svg"
                      alt="The Colton Morrill Logo"
                      width={28}
                      height={28}
                      priority
                    />
                    <Image
                      className="hidden h-7 w-auto opacity-95 transition hover:opacity-100 lg:block"
                      src="/cm-logo-01.svg"
                      alt="The Colton Morrill Logo"
                      width={28}
                      height={28}
                      priority
                    />
                  </Link>

                  <div className="hidden items-center gap-1 sm:flex">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white/[0.08] text-white"
                            : "text-slate-300/90 hover:bg-white/[0.05] hover:text-white",
                          "rounded-full px-4 py-2 text-[0.82rem] font-medium tracking-[0.01em] transition"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="section-shell mt-3">
              <div className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(18,26,46,0.88)_0%,rgba(10,16,32,0.78)_100%)] shadow-[0_24px_50px_rgba(2,6,23,0.28)] backdrop-blur-md">
                <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.07)_18%,rgba(255,255,255,0.02)_42%,rgba(129,140,248,0.1)_70%,rgba(56,189,248,0.08)_100%)] opacity-80" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.45rem-1px)] bg-[linear-gradient(180deg,rgba(14,21,39,0.92)_0%,rgba(8,13,28,0.8)_100%)]" />

                <div className="relative p-2.5">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-white/[0.08] text-white"
                          : "text-slate-300 hover:bg-white/[0.05] hover:text-white",
                        "mb-1 block rounded-2xl px-4 py-2.5 text-[0.95rem] font-medium transition last:mb-0"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
