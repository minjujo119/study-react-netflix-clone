export const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: ( index: number ) => {
    return { opacity: 1, y: 0, transition: { delay: 0.07 * index } };
  },
};
