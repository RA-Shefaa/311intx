import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-xl p-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to <span className="text-cyan-400 italic">InternX</span>!
            </h1>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-gray-300">
                Say hello to <span className="text-cyan-400 italic">InternX</span> — the smartest and coolest way to
                land internships.
                <br />
                <span className="font-semibold text-white">
                  InternX is where opportunity meets ambition — built for students, powered by universities, and trusted
                  by companies.
                </span>
              </p>

              <p className="text-gray-300">
                Whether you're a student chasing your first big break or a company scouting fresh talent,{" "}
                <span className="text-cyan-400 italic">InternX</span> brings you together.
                <br />
                Designed to bridge the gap between classrooms and careers, our platform helps students discover
                internships aligned with their goals, while making it easy for companies to connect with tomorrow's
                talent — today.
              </p>

              <p className="text-gray-300">
                <span className="font-semibold text-white">
                  No spam, no chaos — just a smooth, smart, and student-friendly experience.
                </span>
                <br />
                Because sometimes, all you need is the <span className="text-yellow-400 font-semibold">X-Factor</span>{" "}
                to your future.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <span className="text-xl font-bold text-orange-400">Ready to start your adventure? 🚀</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                <Link href="/register">Join InternX</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent"
              >
                <Link href="/internships">Browse Internships</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
