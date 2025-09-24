export const GoBackMeta = (path: string, title: string) => ({
    showToolbar: true,
    title: title,
    toolbarActions: [
        {
            label: "Back",
            icon: "i-heroicons-arrow-left",
            to: path,
        },
    ],
});
