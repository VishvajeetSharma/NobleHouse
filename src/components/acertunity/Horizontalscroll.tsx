import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

type CardType = {
  id: number;

  url: string;
};

const Horizontalscroll = () => {
  return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-95%", "1%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-13 flex h-auto items-center overflow-hidden">
        <motion.div style={{ x: x1 }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
      <div className="sticky top-40 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x: x2 }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[270px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
    </div>
  );
};

export default Horizontalscroll;

const cards = [
  {
    url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 1",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1598460880248-71ec6d2d582b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 2",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 3",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 4",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1511923199659-1c16881689de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 5",
    id: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 6",
    id: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1583784561105-a674080f391e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Title 7",
    id: 7,
  },
];
