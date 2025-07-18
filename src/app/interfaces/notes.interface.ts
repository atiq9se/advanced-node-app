interface INotes{
    title: String,
    content: String,
    category: "personal"|"work"|"study"|"other",
    pinned: boolean,
    tags:{
        label: String,
        color: String
    }
}