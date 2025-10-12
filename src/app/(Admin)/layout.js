import localfont from "next/font/local"
import "../globals.css";
import AuthProvider from "@/Provider/AuthProvider";
import Link from "next/link";
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


export const metadata = {
    title: "Afs Games",
    description: "A platform for gaming enthusiasts.",
  };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={allianceNo2.className}>
                <QueryProvider>
                    <AuthProvider>
                        <main className="h-screen relative">
                            <div className="drawer lg:drawer-open">
                                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content flex flex-col">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden w-fit ml-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 z-10 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                        </svg>
                                    </label>
                                    {children}
                                </div>
                                <div className="drawer-side ">
                                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu text-black min-h-full 2xl:w-80 xl:w-80 min-w-1/2 p-4 bg-[#FFE500]">
                                        {/* Sidebar content here */}
                                        <li><a href='/'>Home</a></li>
                                        <li><Link href={'/adminPanel'}>All Users</Link></li>
                                        <li><Link href={'/uploadedGPX'}>Uploaded Gpx</Link></li>
                                        <li><Link href={'/sponsors'}>Add Sponsors</Link></li>
                                        <li><Link href={'/faqPanel'}>Add FAQ</Link></li>
                                        <li><Link href={'/addAwards'}>Add Awards</Link></li>
                                        <li><Link href={'/manageEvent'}>Manage Event</Link></li>
                                        <li><Link href={'/manageLeaderboard'}>Leaderboard</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
