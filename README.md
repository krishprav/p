# PromptFlow

Build n8n workflows by just describing them in plain English. An AI-powered tool that generates fully working n8n workflows from natural language prompts.

## 🚀 Features

- **AI-Powered Workflow Generation**: Convert natural language prompts into working n8n workflows
- **Template Gallery**: Browse and use pre-built workflow templates
- **One-Click Export**: Download JSON files ready to import into n8n
- **Smart Explanations**: Understand what each generated workflow does
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with Lucide React icons
- **API**: Next.js API routes (with OpenAI integration planned)
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd promptflow
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional for development):
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# OpenAI Configuration (for production)
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── templates/         # Templates page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── prompt-form.tsx   # Main prompt input form
│   ├── workflow-preview.tsx # Workflow display component
│   └── template-card.tsx # Template card component
├── lib/                  # Utility functions
│   ├── api.ts            # API client functions
│   └── utils.ts          # Helper utilities
├── store/                # State management
│   └── workflow-store.ts # Zustand store
└── types/                # TypeScript type definitions
    └── index.ts          # Core types and interfaces
```

## 🎯 Usage

### Generating Workflows

1. Navigate to the home page
2. Enter a natural language description of your workflow
3. Click "Generate Workflow"
4. Review the generated workflow and explanation
5. Download the JSON file or copy it to clipboard
6. Import into your n8n instance

### Example Prompts

- "When I get an email, summarize it with ChatGPT and send to Slack"
- "Create a workflow that monitors Twitter mentions and saves them to a Google Sheet"
- "When a new lead is added to Airtable, send them a welcome email via Mailchimp"
- "Monitor a website for changes and notify me on Telegram"
- "When I receive a payment via Stripe, create a task in ClickUp"

### Using Templates

1. Navigate to the Templates page
2. Browse available templates by category
3. Search for specific functionality
4. Click "Use Template" to copy the JSON
5. Import into your n8n instance

## 🔧 Development

### Adding New Templates

1. Add template data to `src/lib/api.ts` in the `mockTemplates` array
2. Follow the `WorkflowTemplate` interface structure
3. Include proper tags for categorization

### Customizing the UI

- Components are in `src/components/`
- Styles use Tailwind CSS classes
- Global styles in `src/app/globals.css`

### API Integration

The current version uses mock data. To integrate with OpenAI:

1. Add your OpenAI API key to `.env.local`
2. Update the API route in `src/app/api/generate/route.ts`
3. Implement the actual OpenAI prompt and response parsing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Environment Variables

Set these in your deployment environment:

```bash
NEXT_PUBLIC_API_URL=https://your-domain.com
OPENAI_API_KEY=your_openai_api_key
```

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Basic UI and components
- ✅ Mock workflow generation
- ✅ Template gallery
- ✅ JSON export functionality

### Phase 2 (Next)
- 🔄 OpenAI integration
- 🔄 Real workflow generation
- 🔄 User authentication
- 🔄 Workflow history
- 🔄 Smart template matching

### Phase 3 (Future)
- 🔄 n8n instance integration
- 🔄 Advanced workflow editing
- 🔄 Team collaboration
- 🔄 Analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) for the amazing automation platform
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Lucide React](https://lucide.dev/) for the icons

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the n8n community
