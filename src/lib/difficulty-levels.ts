/**
 * Define difficulty levels with corresponding text pools
 */
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface DifficultyConfig {
    label: string;
    description: string;
    texts: string[];
}

export const DIFFICULTY_LEVELS: Record<DifficultyLevel, DifficultyConfig> = {
    easy: {
        label: "Easy",
        description: "Simple words and common sentences",
        texts: [
            "The quick brown fox jumps over the lazy dog.",
            "Practice typing every single day to improve your speed.",
            "Learning to type fast takes time and dedication.",
            "Typing is an important skill for computer users.",
            "The sun is shining and the birds are singing.",
            "I love to read books in my free time.",
            "Technology makes our lives easier and more convenient.",
            "Hard work and dedication lead to success.",
        ],
    },
    medium: {
        label: "Medium",
        description: "Mixed vocabulary and various sentence structures",
        texts: [
            "The expeditious locomotion of the auburn canine traverses the indolent feline.",
            "Proficiency in typing requires consistent practice and unwavering dedication.",
            "Education serves as the most formidable instrument for transforming society.",
            "Success is not determined by finality, nor failure by fatality of courage.",
            "Contemporary technology integrates seamlessly into quotidian existence.",
            "The synchronization of cognitive abilities and motor skills enhances productivity.",
            "Linguistic versatility and computational proficiency define modern professional competency.",
            "Semantic comprehension alongside syntactic precision facilitates effective communication.",
        ],
    },
    hard: {
        label: "Hard",
        description: "Complex vocabulary and challenging sentence structures",
        texts: [
            "The perspicacious entrepreneur's multifaceted entrepreneurial endeavors necessitated unwavering perseverance.",
            "Phenomenological introspection combined with epistemological rigor engenders comprehensive philosophical elucidation.",
            "The cacophonous concatenation of obfuscatory terminology perpetuates epistemic obfuscation.",
            "Metaphysical conundrums surrounding ontological realities continue to perplex contemporary philosophical discourse.",
            "The quintessential manifestation of linguistic sophistication transcends conventional morphosyntactic parameters.",
            "Hermeneutical methodologies facilitate the exegesis of abstruse theological propositions.",
            "Serendipitous concatenations of fortuitous circumstances engender unanticipated consequences.",
            "The proliferation of neologistic constructions augments lexicographical complexity exponentially.",
        ],
    },
};

/**
 * Get random text from difficulty level
 */
export function getRandomTextForDifficulty(
    difficulty: DifficultyLevel
): string {
    const texts = DIFFICULTY_LEVELS[difficulty].texts;
    return texts[Math.floor(Math.random() * texts.length)];
}

/**
 * Get difficulty info
 */
export function getDifficultyInfo(difficulty: DifficultyLevel) {
    return DIFFICULTY_LEVELS[difficulty];
}
