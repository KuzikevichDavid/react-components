export interface RequestType {
  request: Request;
  params: Record<string, string | undefined>;
  context: unknown;
}
