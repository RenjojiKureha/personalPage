import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="text-xl font-bold text-text-heading mt-10 mb-4" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-lg font-semibold text-text-heading mt-8 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-text-primary leading-relaxed mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 text-text-primary" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-text-primary" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a className="text-accent-blue hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  strong: (props) => <strong className="text-text-heading font-semibold" {...props} />,
  code: (props) => (
    <code className="bg-bg-secondary px-1.5 py-0.5 rounded text-sm text-accent-red font-mono" {...props} />
  ),
  pre: (props) => (
    <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-2 border-accent-purple pl-4 italic text-text-muted mb-4" {...props} />
  ),
};
