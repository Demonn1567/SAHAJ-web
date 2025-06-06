import react, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <h2 className="text-2xl font-bold text-center mb-8 text-neutral-800 dark:text-neutral-200">
        Empanelled Hospitals
      </h2>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Gurgaon, Haryana",
    title: "Artemis Hospitals",
    src: "https://www.medicarespots.com/wp-content/uploads/2020/03/Artemis-Hospital-1.jpeg",
    ctaText: "Visit",
    ctaLink: "https://www.artemishospitals.com/",
    content: () => {
      return (
        <p>
          Artemis Hospital in Gurgaon was established in 2007 with a mission to
          deliver world-class healthcare procedures. It is a multi-specialty
          hospital offering a wide array of medical care services spread across
          9 acres, is a 400 plus bed; state-of-the-art multi-specialty hospital
          located in Gurgaon, India. Artemis Hospital is the first JCI and NABH
          accredited hospital in Gurgaon and became a proactive partner in the
          local community initiatives.
        </p>
      );
    },
  },
  {
    description: "Chennai, Tamil Nadu",
    title: "Apollo Hospitals",
    src: "https://www.medicarespots.com/wp-content/uploads/2020/03/Apollo-Hospitals-.jpg",
    ctaText: "Visit",
    ctaLink: "https://www.apollohospitals.com/",
    content: () => {
      return (
        <p>
          The Apollo Hospitals Group was incorporated as a Public Limited
          Company in the year 1979, promoted by Dr. Prathap C. Reddy, Executive
          Chairman. The hospitals have been recognized as the ‘Architect of
          Modern Healthcare’ in India. Apollo hospitals have emerged as Asia’s
          foremost integrated healthcare services provider and have a strong
          presence across the healthcare ecosystem, including Hospitals,
          Pharmacies, Primary Care & Diagnostic Clinics.
        </p>
      );
    },
  },

  {
    description: "New Delhi, Delhi",
    title: "Max Hospitals",
    src: "https://www.medicarespots.com/wp-content/uploads/elementor/thumbs/Max-Hospital-1-onbi1vswmbfw1axf88t878obnb5hfigag0h2kp4n1c.jpg",
    ctaText: "Visit",
    ctaLink: "https://www.maxhealthcare.in/",
    content: () => {
      return (
        <p>
          One of the leading Healthcare institutes Max Healthcare Institute is a
          hospital chain based in New Delhi, India with 14 hospitals across
          North India committed to providing quality medical care to the
          community. Max Super Specialty Hospital in Saket was founded in 2006
          and established as a part of the Max Healthcare consortium and a unit
          of Devki Devi Foundation and listed in the Bombay Stock Exchange and
          National Stock Exchange with more than 37,000 shareholders. Max is a
          public limited company and several of its hospitals are NABH
          Accredited.
        </p>
      );
    },
  },
  {
    description: "Manipal, Karnataka",
    title: "Manipal Hospitals",
    src: "https://www.medicarespots.com/wp-content/uploads/2020/03/MANIPAL-HOSPITALS-1.jpg",
    ctaText: "Visit",
    ctaLink: "https://www.manipalhospitals.com/",
    content: () => {
      return (
        <p>
          Manipal Hospitals is 380 bedded multi-specialty healthcare providers
          catering to both Indian and international patients. It is one of
          India’s foremost hospitals that aim at providing specialized tertiary
          and quaternary care. Manipal hospital is a part of the Manipal
          Education and Medical Group (MEMG) – a leader in the areas of
          education and healthcare. With more than 5000 operational beds, their
          hospitals provide quality and affordable healthcare to everyone.
        </p>
      );
    },
  },
];
