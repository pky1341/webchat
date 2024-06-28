import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Intro from "@/components/main/Intro";

export default function Home() {
  return (
    <div >
      <header>
        <Navbar />
      </header>
      <main className="mt-14">
        <Intro />
      </main>
      <Footer />
    </div>
  );
}
