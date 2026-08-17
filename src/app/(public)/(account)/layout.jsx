export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default async function layout({ children }) {
  return <>{children}</>;
}