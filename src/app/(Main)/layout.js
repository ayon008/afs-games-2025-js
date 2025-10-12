import localfont from "next/font/local"
import "../globals.css";
import Navbar from "@/Shared/Navbar";
import AuthProvider from "@/Provider/AuthProvider";
import QueryProvider from "@/Provider/QueryProvider";

const allianceNo2 = localfont(
  {
    src: [
      {
        path: '../../../public/fonts/AllianceNo2-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/Alliance No.2 Medium.otf',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/Alliance No.2 SemiBold.otf',
        weight: '600',
        style: 'normal',
      },
      {
        path: '../../../public/fonts/Alliance No.2 Bold.otf',
        weight: '700',
        style: 'normal',
      },
    ]
  }
);

export const antiHero = localfont(
  {
    src: [
      {
        path: '../../../public/fonts/Antihero.ttf',
        weight: '400',
        style: 'normal',
      }
    ]
  }
);

export const morgana = localfont(
  {
    src: [
      {
        path: '../../../public/Feta Morgana.otf',
        weight: '400',
        style: 'normal',
      }
    ]
  }
)

export const metadata = {
  title: "Afs Games",
  description: "A platform for gaming enthusiasts.",
};

export const revalidate = 5;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={allianceNo2.className}>
        <main className="bg-[#FFFFF8] max-w-[1920px] mx-auto">
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <div className="min-h-screen banner">
                {children}
              </div>
              {/* <Footer /> */}
            </AuthProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
