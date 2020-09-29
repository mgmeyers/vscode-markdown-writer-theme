import fs from 'fs'
import vscode from 'vscode'
import { generateThemes } from './themeGenerator'

const themeSettings = [
    'markdown-writer-theme.light.accentColor',
    'markdown-writer-theme.light.backgroundColor',
    'markdown-writer-theme.light.foregroundColor',
    'markdown-writer-theme.dark.accentColor',
    'markdown-writer-theme.dark.backgroundColor',
    'markdown-writer-theme.dark.foregroundColor',
]

function getIsDirEmpty(dir: string) {
    return fs.readdirSync(dir).length === 0
}

export function activate(context: vscode.ExtensionContext) {
    const themePath = context.asAbsolutePath('themes')

    if (getIsDirEmpty(themePath)) {
        generateThemes(themePath)
    }

    context.subscriptions.push(
        vscode.commands.registerCommand('markdown-writer-theme.update', () =>
            generateThemes(themePath)
        )
    )

    vscode.workspace.onDidChangeConfiguration((event) => {
        for (const setting of themeSettings) {
            if (event.affectsConfiguration(setting)) {
                return generateThemes(themePath)
            }
        }
    })
}

export function deactivate() {}
