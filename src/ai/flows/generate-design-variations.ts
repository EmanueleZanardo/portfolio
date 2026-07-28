'use server';
/**
 * @fileOverview Generates alternative design variations for a portfolio site using generative AI.
 *
 * - generateDesignVariations - A function that generates design suggestions.
 * - GenerateDesignVariationsInput - The input type for the generateDesignVariations function.
 * - GenerateDesignVariationsOutput - The return type for the generateDesignVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDesignVariationsInputSchema = z.object({
  originalSiteContent: z
    .string()
    .describe('The complete HTML content of the original portfolio website.'),
  primaryColor: z
    .string()
    .describe(
      'The primary color of the portfolio site, in hexadecimal format (e.g., #FFFF33).'
    ),
  backgroundColor: z
    .string()
    .describe(
      'The background color of the portfolio site, in hexadecimal format (e.g., #333333).'
    ),
  accentColor: z
    .string()
    .describe(
      'The accent color of the portfolio site, in hexadecimal format (e.g., #FF9933).'
    ),
  bodyTextFont: z
    .string()
    .describe('The font to use for body text (e.g., Roboto Mono).'),
  headlineFont: z
    .string()
    .describe('The font to use for headlines (e.g., Bebas Neue).'),
});
export type GenerateDesignVariationsInput = z.infer<typeof GenerateDesignVariationsInputSchema>;

const GenerateDesignVariationsOutputSchema = z.object({
  designSuggestions: z
    .array(z.string())
    .describe(
      'An array of design suggestions, each suggestion being a description of an alternative layout and color scheme for the portfolio site.'
    ),
});
export type GenerateDesignVariationsOutput = z.infer<typeof GenerateDesignVariationsOutputSchema>;

export async function generateDesignVariations(
  input: GenerateDesignVariationsInput
): Promise<GenerateDesignVariationsOutput> {
  return generateDesignVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDesignVariationsPrompt',
  input: {schema: GenerateDesignVariationsInputSchema},
  output: {schema: GenerateDesignVariationsOutputSchema},
  prompt: `You are an expert web designer tasked with generating alternative design variations for a portfolio website.

  The original website has the following characteristics:
  - Primary color: {{{primaryColor}}}
  - Background color: {{{backgroundColor}}}
  - Accent color: {{{accentColor}}}
  - Body text font: {{{bodyTextFont}}}
  - Headline font: {{{headlineFont}}}
  - Original site content: {{{originalSiteContent}}}

  Based on these characteristics, suggest three alternative layouts and color schemes for the portfolio site. Be creative and explore different design possibilities while maintaining a modern and visually appealing aesthetic.

  Return an array of design suggestions, where each suggestion is a concise description of the alternative layout and color scheme.
  `,
});

const generateDesignVariationsFlow = ai.defineFlow(
  {
    name: 'generateDesignVariationsFlow',
    inputSchema: GenerateDesignVariationsInputSchema,
    outputSchema: GenerateDesignVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
