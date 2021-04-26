export function center (markup: string): string {
  return `
  <div style="color: #000; font-family: sans-serif; text-align: center; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
    ${markup}
  </div>
  `
}
