import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-2 p-5 max-w-xs w-full dark:bg-slate-800 bg-slate-300 rounded-lg">
            <div className="text-center my-4">
                <h1>Hellow</h1>
                <Image
                    src="/images/logo.png"
                    alt="Hellow"
                    width={18}
                    height={18}
                    className="-mt-5 float-right mr-24"
                />
            </div>
            <div>
                <Link href="/login" className="dark:bg-slate-900 bg-slate-400 text-center p-3 rounded-lg block">
                    Logar
                </Link>
            </div>
            <div>
                <Link href="/criar-conta" className="dark:bg-slate-900 bg-slate-400 text-center p-3 rounded-lg block">
                    Criar conta
                </Link>
            </div>
        </div>
    </main>
  )
}
