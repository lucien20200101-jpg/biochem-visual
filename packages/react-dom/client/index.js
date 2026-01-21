export function createRoot(container) {
  return {
    render() {
      if (!container) {
        throw new Error("No container provided");
      }
      container.textContent = "";
    }
  };
}
