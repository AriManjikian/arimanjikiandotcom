import {
  MarkdownLink,
  MarkdownText,
  MarkdownHorizontalRule,
  MarkdownSection,
  MarkdownBlockquote,
  MarkdownTable,
  MarkdownList,
  MarkdownCode,
} from '../../components/MarkdownComponents';
const MarkdownShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen" id="top">
      <MarkdownSection title="Markdown Components Showcase" level={1}>
        <p className=" mb-6">A demonstration of the markdown-style components.</p>
      </MarkdownSection>

      <MarkdownSection title="Headings" level={2}>
        <MarkdownSection title="This is a Level 1 Heading" level={1}>
          <p>Content under level 1 heading</p>
        </MarkdownSection>
        <MarkdownSection title="This is a Level 2 Heading" level={2}>
          <p>Content under level 2 heading</p>
        </MarkdownSection>
        <MarkdownSection title="This is a Level 3 Heading" level={3}>
          <p>Content under level 3 heading</p>
        </MarkdownSection>
      </MarkdownSection>

      <MarkdownSection title="Text Formatting" level={2}>
        <div className="space-y-3">
          <p>
            Here is some <MarkdownText bold>bold text</MarkdownText> and some{' '}
            <MarkdownText italic>italic text</MarkdownText>.
          </p>
          <p>
            You can also have{' '}
            <MarkdownText bold italic>
              bold and italic
            </MarkdownText>{' '}
            or <MarkdownText strikethrough>strikethrough text</MarkdownText>.
          </p>
          <p>
            Inline code looks like this: <MarkdownCode inline>console.log(&apos;Hello&apos;)</MarkdownCode>
          </p>
        </div>
      </MarkdownSection>

      <MarkdownSection title="Code Blocks" level={2}>
        <p className="mb-4">Her&apos;s a JavaScript example:</p>
        <MarkdownCode language="javascript">
          {`function greetUser(name) {
  if (!name) {
    throw new Error('Name is required');
  }

  return \`Hello, \${name}! Welcome to our application.\`;
}

// Usage example
const greeting = greetUser('Alice');
console.log(greeting);`}
        </MarkdownCode>

        <p className="mb-4">And here&apos;s some Python:</p>
        <MarkdownCode language="python">
          {`def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])

    return sequence

# Example usage
fib_numbers = fibonacci(10)
print(f"First 10 Fibonacci numbers: {fib_numbers}")`}
        </MarkdownCode>
      </MarkdownSection>

      <MarkdownSection title="Lists" level={2}>
        <MarkdownSection title="Unordered List" level={3}>
          <MarkdownList items={['First item', 'Second item with more content', 'Third item']} />
          <MarkdownList key="nested" items={['Nested item 1', 'Nested item 2']} nested />
        </MarkdownSection>

        <MarkdownSection title="Ordered List" level={3}>
          <MarkdownList
            ordered
            items={['First step', 'Second step', 'Third step with detailed explanation', 'Final step']}
          />
        </MarkdownSection>
      </MarkdownSection>

      <MarkdownSection title="Tables" level={2}>
        <MarkdownTable
          headers={['Name', 'Age', 'City', 'Occupation']}
          rows={[
            ['Alice Johnson', '28', 'New York', 'Software Engineer'],
            ['Bob Smith', '34', 'San Francisco', 'Product Manager'],
            ['Carol Brown', '29', 'Chicago', 'UX Designer'],
            ['David Wilson', '42', 'Austin', 'Data Scientist'],
          ]}
        />
      </MarkdownSection>

      <MarkdownSection title="Blockquotes" level={2}>
        <MarkdownBlockquote author="Albert Einstein">
          Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the
          entire world, stimulating progress, giving birth to evolution.
        </MarkdownBlockquote>

        <MarkdownBlockquote>
          This is a blockquote without an author. It can contain multiple sentences and longer content to demonstrate
          the formatting capabilities.
        </MarkdownBlockquote>
      </MarkdownSection>

      <MarkdownSection title="Links" level={2}>
        <div className="space-y-2">
          <p>
            Here&apos;s a link to <MarkdownLink href="https://github.com">GitHub</MarkdownLink> and another to{' '}
            <MarkdownLink href="https://reactjs.org" external>
              React Documentation
            </MarkdownLink>
            .
          </p>
          <p>
            You can also link to <MarkdownLink href="#top">internal sections</MarkdownLink> within the same page.
          </p>
        </div>
      </MarkdownSection>

      <MarkdownHorizontalRule />

      <MarkdownSection title="Complex Example" level={2}>
        <p className="mb-4">This section demonstrates how multiple components work together:</p>

        <MarkdownBlockquote>
          <MarkdownText bold>Note:</MarkdownText> The following code example shows how to create a{' '}
          <MarkdownCode inline>React component</MarkdownCode> with proper error handling.
        </MarkdownBlockquote>

        <MarkdownCode language="typescript">
          {`interface User {
  id: string;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};`}
        </MarkdownCode>

        <MarkdownList
          ordered
          items={[
            'Import necessary React hooks',
            'Define TypeScript interfaces for type safety',
            'Implement proper loading and error states',
            'Use useEffect for data fetching',
            'Return appropriate JSX based on state',
          ]}
        />
      </MarkdownSection>

      <MarkdownHorizontalRule />

      <MarkdownSection title="Conclusion" level={2}>
        <p>
          This showcase demonstrates a complete set of markdown components that maintain the authentic look and feel of
          markdown syntax while providing the flexibility and interactivity of React components. Each component includes
          proper TypeScript interfaces and follows consistent styling patterns.
        </p>
      </MarkdownSection>
    </div>
  );
};

export default MarkdownShowcase;
