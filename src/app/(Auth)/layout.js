import localfont from "next/font/local"
import "../globals.css";
import Image from "next/image";
import bgImage from '../../../public/afs-games-background.png'
import AuthProvider from "@/Provider/AuthProvider";
import logo from '../../../public/logo afs games (3).svg'
import Script from "next/script";

const allianceNo2 = localfont(
    {
        src: [
            {
                path: '../../../public/fonts/AllianceNo2-Regular.ttf',
                weight: '400',
                style: 'normal',
            },
        ]
    }
);

export const metadata = {
    title: "Afs Games",
    description: "A platform for gaming enthusiasts.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={allianceNo2.className}>
                <AuthProvider>
                    <main className="h-screen relative">
                        <Image src={bgImage} className="w-full h-full inset-0 object-cover z-10" alt="" placeholder="blur" />
                        <div className="overlay z-20"></div>
                        <div className="top-4 left-4 absolute z-40">
                            <Image src={logo} className='2xl:w-[92px] lg:w-[72px] w-[40px] h-auto' alt='logo' />
                        </div>
                        <div className="absolute w-full !z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {children}
                        </div>
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
