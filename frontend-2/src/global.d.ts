// Declaración de módulo para importar componentes React en archivos .jsx desde TypeScript.
// Permite que TypeScript reconozca e importe archivos .jsx como componentes de React.

declare module "*.jsx" {
  const component: React.ComponentType<any>;
  export default component;
}
