import vscode from 'vscode'

export type Variant = 'light' | 'dark'
export type Config = {
    [v in Variant]: {
        accentColor: string
        backgroundColor: string
        foregroundColor: string
    }
}

export function getConfig(): Config {
    const config = vscode.workspace.getConfiguration('markdown-writer-theme')

    return {
        light: {
            accentColor: config.get('light.accentColor') || '#0094f0',
            backgroundColor: config.get('light.backgroundColor') || '#ffffff',
            foregroundColor: config.get('light.foregroundColor') || '#0e101a',
        },
        dark: {
            accentColor: config.get('dark.accentColor') || '#e4b781',
            backgroundColor: config.get('dark.backgroundColor') || '#052529',
            foregroundColor: config.get('dark.foregroundColor') || '#b2cacd',
        },
    }
}
