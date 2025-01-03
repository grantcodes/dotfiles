import { Binding } from "astal"


const truncateText = (text: string|Binding<string>, maxLength: number = 50): string => {
    let truncated = ''
    
    if (text instanceof Binding) {
        truncated = text.get()
    } else {
        truncated = text
    }

    if (truncated.length <= maxLength) {
        return truncated
    }

    truncated = truncated.slice(0, maxLength)

    return truncated + "…"
}

export { truncateText }