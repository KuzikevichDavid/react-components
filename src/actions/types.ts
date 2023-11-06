export interface RequestType {
  request: Request;
  params: Record<string, string>;
  context: unknown;
}
