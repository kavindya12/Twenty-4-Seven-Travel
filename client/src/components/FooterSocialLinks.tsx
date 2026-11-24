function FacebookBrandIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#1877F2" />
      <path
        fill="#fff"
        d="M22.2 20.9h2.7l.4-2.8h-2.6v-1.8c0-.8.2-1.3 1.3-1.3h1.4V13c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2h-2.5v2.8h2.5v7.3h3.1v-7.3Z"
      />
    </svg>
  )
}

function InstagramBrandIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
      <defs>
        <radialGradient id="ig-footer-a" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FED373" />
          <stop offset="20%" stopColor="#F15245" />
          <stop offset="45%" stopColor="#D92E7D" />
          <stop offset="75%" stopColor="#9B36B7" />
          <stop offset="100%" stopColor="#515BD4" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#ig-footer-a)" />
      <path
        fill="#fff"
        d="M20 12.8c2.4 0 2.7 0 3.6.1.9 0 1.5.2 2 .4.5.2 1 .5 1.5.9.4.4.7.9.9 1.5.2.5.3 1.1.4 2 .1.9.1 1.2.1 3.6s0 2.7-.1 3.6c0 .9-.2 1.5-.4 2-.2.5-.5 1-.9 1.5-.4.4-.9.7-1.5.9-.5.2-1.1.3-2 .4-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-.9 0-1.5-.2-2-.4a4 4 0 0 1-1.5-.9 4 4 0 0 1-.9-1.5c-.2-.5-.3-1.1-.4-2-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c0-.9.2-1.5.4-2 .2-.5.5-1 .9-1.5.4-.4.9-.7 1.5-.9.5-.2 1.1-.3 2-.4.9-.1 1.2-.1 3.6-.1Zm0-1.6c-2.5 0-2.8 0-3.7.1-1 0-1.7.2-2.3.5-.7.3-1.2.6-1.7 1.2-.5.5-.9 1.1-1.2 1.7-.3.6-.5 1.3-.5 2.3-.1 1-.1 1.3-.1 3.8s0 2.8.1 3.8c0 1 .2 1.7.5 2.3.3.7.6 1.2 1.2 1.7.5.5 1.1.9 1.7 1.2.6.3 1.3.5 2.3.5 1 .1 1.3.1 3.8.1s2.8 0 3.8-.1c1 0 1.7-.2 2.3-.5.7-.3 1.2-.6 1.7-1.2.5-.5.9-1.1 1.2-1.7.3-.6.5-1.3.5-2.3.1-1 .1-1.3.1-3.8s0-2.8-.1-3.8c0-1-.2-1.7-.5-2.3a5.5 5.5 0 0 0-1.2-1.7 5.5 5.5 0 0 0-1.7-1.2c-.6-.3-1.3-.5-2.3-.5-1-.1-1.3-.1-3.8-.1Z"
      />
      <path
        fill="#fff"
        d="M20 15.7a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm0 7.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Zm5.4-7.3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
      />
    </svg>
  )
}

const linkClass =
  "inline-flex shrink-0 rounded-full shadow-md shadow-black/25 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"

export function FooterSocialLinks() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <a
        href="https://web.facebook.com/people/Twenty-4-Seven-Travel/61595064282608/?sk=grid"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className={linkClass}
      >
        <FacebookBrandIcon />
      </a>
      <a
        href="https://www.instagram.com/twent_y4seventravel/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className={linkClass}
      >
        <InstagramBrandIcon />
      </a>
    </div>
  )
}