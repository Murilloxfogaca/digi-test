import type { Metadata } from "next";
import "../assets/globals.css";
import { CartBar } from "@/components/cartBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <div className="min-h-screen container mx-auto bg-gray-50 pb-10">
          <div className="mx-auto">
            <main className="">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl mb-0 uppercase font-bold text-rose-600">
                    Explorador Digi
                  </h2>
                  <div className="flex items-center justify-between">
                    <CartBar />
                  </div>
                </div>
              </div>
              <div className="px-4">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
