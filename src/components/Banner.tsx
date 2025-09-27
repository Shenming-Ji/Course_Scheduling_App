type BannerProps = { title: string };

const Banner = ({ title }: BannerProps) => (
  <header>
    <h1 style={{ fontSize: '3rem' }}>{title}</h1>
  </header>
);

export default Banner;