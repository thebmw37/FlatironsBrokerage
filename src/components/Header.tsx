import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { NAV, SITE } from '../data/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [propsOpen, setPropsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setPropsOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-ivory/95 py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-ivory/70 py-5 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        <Link to="/" className="group flex items-center" aria-label={`${SITE.name} home`}>
          <img
            src="/images/source/png_logo.png"
            alt={`${SITE.name} logo`}
            className={`w-auto transition-all duration-500 ${
              scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setPropsOpen(true)}
                onMouseLeave={() => setPropsOpen(false)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 text-xs font-medium tracking-[0.28em] uppercase transition-colors ${
                      isActive
                        ? 'text-charcoal'
                        : 'text-ink-soft hover:text-charcoal'
                    }`
                  }
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </NavLink>
                {propsOpen && (
                  <div className="absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 pt-4">
                    <ul className="rounded-sm border border-line bg-paper py-2 shadow-xl">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <NavLink
                            to={c.to}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-xs tracking-[0.18em] uppercase transition-colors ${
                                isActive
                                  ? 'bg-stone-soft text-charcoal'
                                  : 'text-ink-soft hover:bg-stone-soft hover:text-charcoal'
                              }`
                            }
                          >
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative text-xs font-medium tracking-[0.28em] uppercase transition-colors ${
                    isActive
                      ? 'text-charcoal'
                      : 'text-ink-soft hover:text-charcoal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 h-px w-6 -translate-x-1/2 bg-brass" />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-charcoal bg-charcoal px-6 py-2.5 text-[11px] font-medium tracking-[0.28em] text-ivory uppercase transition-all hover:bg-graphite hover:tracking-[0.32em]"
          >
            Contact Us
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="border border-charcoal/30 p-2 text-charcoal lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-ivory lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block px-2 py-3 text-xs font-medium tracking-[0.28em] uppercase ${
                      isActive ? 'text-charcoal' : 'text-ink-soft'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                {item.children && (
                  <ul className="mb-2 ml-2 border-l border-line">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <NavLink
                          to={c.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-[11px] tracking-[0.22em] uppercase ${
                              isActive ? 'text-charcoal' : 'text-ink-muted'
                            }`
                          }
                        >
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <Link
                to="/contact"
                className="block bg-charcoal px-4 py-3 text-center text-[11px] font-medium tracking-[0.28em] text-ivory uppercase"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
