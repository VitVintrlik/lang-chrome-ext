# Netflix Subtitle Translator - Smart Text Selection Architecture

## Overview
Intelligent text selection system that analyzes subtitles and creates meaningful selectable units based on the source language's linguistic patterns.

## Architecture

### Language-Specific Approach
- User selects source language in settings (Japanese, Korean, Chinese, etc.)
- Each language uses dedicated morphological analysis libraries
- Smart segmentation creates meaningful selectable units

### Supported Languages & Libraries
- **Japanese**: kuromoji.js for kanji compounds and morphological analysis
- **Korean**: korean-text-analytics or mecab-ko-js for hanja and word boundaries
- **Chinese**: jieba-js or pinyin-pro for character segmentation
- **General**: franc for language detection

## Implementation Plan

### File Structure
```
src/ui/selector/
├── index.tsx          # Main selector component
├── LanguageAnalyzer.ts # Language-specific analysis logic
├── SelectionOverlay.tsx # Dark overlay with interactive text
└── types.ts           # Type definitions
```

### Workflow
1. **Language Detection**: User sets source language in settings
2. **Text Capture**: Content script detects subtitle elements
3. **Analysis**: Background script performs language-specific morphological analysis
4. **Segmentation**: Creates selectable segments (kanji compounds, contextual phrases)
5. **UI Rendering**: Smart overlay with different highlighting for different unit types
6. **User Refinement**: Allow fine-tuning of selection before translation

### Key Features
- Handles ambiguous kanji compounds using context analysis
- Groups context-dependent morphemes that lose meaning when separated
- Modular language analyzers with fallback support
- Different visual styling for different linguistic units
- Progressive enhancement with manual fine-tuning options

### User Experience Flow
1. User clicks "Select Text" button in popup
2. Screen darkens, subtitle text becomes interactive
3. AI analyzes text using appropriate library for chosen language
4. Creates selectable segments with intelligent boundaries
5. User can expand/reduce selection if needed
6. Selected text sent for translation with context

## Technical Considerations
- Content script overlay for subtitle detection
- Background processing for heavy linguistic analysis
- Efficient rendering of selectable segments
- Context preservation for accurate translation
- Fallback mechanisms for edge cases
