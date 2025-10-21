import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Blog() {
  return (
    <div className="min-h-screen">
      {/* Blog Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Thoughts, insights, and tutorials on web development, technical challenges, and best practices.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-accent/10 rounded-lg p-12 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              I'm working on creating high-quality technical content for you. Check back soon for in-depth articles on web development, tutorials, and industry insights.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">In the meantime, feel free to check out my projects or get in touch.</p>
            <div className="flex gap-4 justify-center">
              <Link to="/projects">
                <Button variant="outline">View Projects</Button>
              </Link>
              <Link to="/contact">
                <Button>Get In Touch</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Placeholder Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold mb-8">Blog Structure (Coming Soon)</h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="p-4 border rounded-lg bg-muted/50">
            📝 Featured Articles - Recently published and popular posts
          </p>
          <p className="p-4 border rounded-lg bg-muted/50">
            🏷️ Categories - Filter posts by topics like React, Node.js, Performance, etc.
          </p>
          <p className="p-4 border rounded-lg bg-muted/50">
            🔍 Search - Find articles by keywords and tags
          </p>
          <p className="p-4 border rounded-lg bg-muted/50">
            💬 Comments - Discussions and feedback on each article
          </p>
        </div>
      </section>
    </div>
  );
}
