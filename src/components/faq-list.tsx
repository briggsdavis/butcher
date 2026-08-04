import { Plus } from "lucide-react"
import type { Faq } from "~/data/faqs"

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="border-t border-cream/15">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          data-animate=""
          data-delay={String(index * 70)}
          className="group border-b border-cream/15"
        >
          <summary className="flex list-none items-center gap-6 py-7 text-left text-cream transition-colors duration-500 hover:text-amber [&::-webkit-details-marker]:hidden">
            <span className="flex-1 font-subhead text-xl md:text-2xl">{faq.question}</span>
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-amber transition-transform duration-500 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-7 text-base leading-relaxed text-tan md:text-lg">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
