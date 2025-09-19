import { AiTipsForm } from "@/components/ai-tips-form";

export default function AiTipsPage() {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Saving Tips</h2>
        </div>
        <p className="text-muted-foreground mt-2">
            Define your own rules and provide transaction history to get personalized saving tips from our AI assistant.
        </p>
        <div className="mt-6">
            <AiTipsForm />
        </div>
      </div>
    );
  }
  