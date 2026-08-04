export type Faq = {
  question: string
  answer: string
}

export const FAQS: readonly Faq[] = [
  {
    question: "Who are we?",
    answer:
      "Butcher and the Rye is Richard DeShantz Restaurant Group's whiskey-forward flagship in the heart of Downtown Pittsburgh's Cultural District, built around a reverence for dry-aged meats, old-world technique, and an unhurried evening at the table.",
  },
  {
    question: "What is Butcher and the Rye best known for?",
    answer:
      "We're best known as Pittsburgh's whiskey destination. Our Whiskey Wall showcases 600+ bottles, and we're the first Pittsburgh bar ever nominated for a James Beard Foundation Award for Outstanding Bar Program. Pair that with rustic American plates built to stand up to a good pour.",
  },
  {
    question: "What is the bourbon and whiskey program like at Butcher and the Rye?",
    answer:
      "Our whiskey list runs 600+ deep, from everyday pours to rare 10-, 12-, and 20-year flights, alongside barrel-aged cocktails, a Sazerac built the right way, and rotating cocktails on draft at the second-floor Rye Bar. If you're searching for the best bourbon bar in Pittsburgh, this is it.",
  },
  {
    question: "When is Butcher and the Rye open?",
    answer:
      "We're open for dinner Wednesday through Saturday, evenings only. Hours can shift around holidays, so check our site or call ahead before you head Downtown.",
  },
  {
    question: "Where is Butcher and the Rye located?",
    answer:
      "212 6th Street, in the Cultural District of Downtown Pittsburgh, an easy walk from Heinz Hall, the Benedum Center, and PPG Paints Arena.",
  },
  {
    question: "Do you take reservations, and is there a dress code?",
    answer:
      "Reservations are recommended, particularly on weekends, and the Rye Bar upstairs also welcomes first-come, first-served guests. Dress is upscale-casual. There is no strict dress code, but most guests dress to match the lodge-refined atmosphere.",
  },
  {
    question: "Do you host private events?",
    answer:
      "We do. Our second-floor Rye Bar includes a more private dining room available for semi-private and private events, ideal for whiskey tastings, celebrations, and corporate gatherings Downtown.",
  },
  {
    question: "What should I order on my first visit?",
    answer:
      "Start with a whiskey flight to find your lane, order the Dirty Pasta, some bread service with Sunday Gravy, and finish with a barrel-aged Manhattan. Ask your server to build a whiskey pairing around your meal because that's what we do best.",
  },
]

export const HOME_FAQS = FAQS.slice(0, 3)
