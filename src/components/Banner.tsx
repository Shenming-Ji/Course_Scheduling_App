type BannerProps = { title: string };

const Banner = ({ title }: BannerProps) => (
  <header>
    <h1 style={{ fontSize: '3rem', marginLeft: '1.5rem', marginTop: '1rem' }}>{title}</h1>
  </header>
);

export default Banner;