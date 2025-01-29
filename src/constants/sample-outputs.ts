export const CODE_EXAMPLES = [
  `Here's an example of a TypeScript utility type that makes all properties optional:
  
  \`\`\`typescript
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
  
  interface User {
    name: string;
    profile: {
      age: number;
      address: {
        street: string;
        city: string;
      };
    };
  }
  
  // Now all properties are optional, deeply
  const partialUser: DeepPartial<User> = {
    name: "John",
    profile: {
      address: {
        city: "New York"
      }
    }
  };
  \`\`\``,

  `Here's a React custom hook for handling infinite scroll:
  
  \`\`\`typescript
  import { useEffect, useRef, useState } from 'react';
  
  interface UseInfiniteScrollOptions {
    threshold?: number;
    loadMore: () => Promise<void>;
  }
  
  export function useInfiniteScroll({ 
    threshold = 100,
    loadMore 
  }: UseInfiniteScrollOptions) {
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      const observer = new IntersectionObserver(
        async (entries) => {
          const target = entries[0];
          if (target.isIntersecting && !loading) {
            setLoading(true);
            await loadMore();
            setLoading(false);
          }
        },
        { rootMargin: \`\${threshold}px\` }
      );
  
      const sentinel = document.createElement('div');
      container.appendChild(sentinel);
      observer.observe(sentinel);
  
      return () => {
        observer.disconnect();
        sentinel.remove();
      };
    }, [threshold, loadMore, loading]);
  
    return { containerRef, loading };
  }
  \`\`\``,

  `Here's a JavaScript debounce function implementation:
  
  \`\`\`javascript
  function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Example usage:
  const handleSearch = debounce((searchTerm) => {
    console.log('Searching for:', searchTerm);
    // API call or expensive operation here
  }, 300);
  
  // Call it multiple times rapidly
  handleSearch('a');
  handleSearch('ap');
  handleSearch('app');
  // Only the last call will execute after 300ms
  \`\`\``,

  `Here's a TypeScript example of the Builder pattern:
  
  \`\`\`typescript
  class Pizza {
    private toppings: string[] = [];
    private crustType: string = '';
    private size: string = '';
  
    addTopping(topping: string): this {
      this.toppings.push(topping);
      return this;
    }
  
    setCrust(type: string): this {
      this.crustType = type;
      return this;
    }
  
    setSize(size: string): this {
      this.size = size;
      return this;
    }
  
    build(): string {
      return \`A \${this.size} \${this.crustType} crust pizza with \${this.toppings.join(', ')}\`;
    }
  }
  
  // Usage:
  const pizza = new Pizza()
    .setSize('large')
    .setCrust('thin')
    .addTopping('mushrooms')
    .addTopping('pepperoni')
    .build();
  
  console.log(pizza);
  // Output: "A large thin crust pizza with mushrooms, pepperoni"
  \`\`\``,
];

export const SAMPLE_RESPONSES = [
  "I understand your question. Let me help you with that. Here's a detailed explanation...",
  "That's an interesting point! Here's what I think about it...",
  "Hello! 👋 Welcome to InFi Chat Assist. How can I assist you today? Whether you have questions, need support, or just want to explore features, I’m here to help. Let me know what you need, and I'll do my best to assist you!",
  "Based on the information you provided, I would recommend the following approach...",
  "Let me break this down into simpler terms. First, we need to consider...",
  "Here's a practical example that might help illustrate the concept...",
];
