import { useLoading, SpinningCircles } from "@agney/react-loading";
import styles from "../../style/style";

const Loading = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <SpinningCircles width="50" />,
  });

  return (
    <div>
      <section {...containerProps} style={styles.loading}>
        {indicatorEl}
      </section>
    </div>
  );
};

export default Loading;
