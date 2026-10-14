/**
 * fs/git 域业务错误类（自旧 `fs-api.ts` 抽出）。
 *
 * 背景：Git 面板保留、fs 域整体删除后，`git-api.ts` 仍需要 `FsError` 作为
 * 「业务错误 → HTTP status + 信封 code」的统一载体（`host/index.ts` 的
 * `wireErrorOf` 按 instanceof 分派，`git.discard` 等破坏性操作的错误也走它）。
 * 把类留在 fs-api.ts 会让 git 对已删模块产生悬挂依赖，故独立成文件 ——
 * 本文件不含任何 fs 功能实现。
 *
 * 签名与默认值与原实现逐字一致（`git-api` 的抛出点只传 message，依赖默认值）。
 */
import { ErrorCode } from "../shared/protocol";

/** 业务错误：携带信封 code 与 HTTP status，分发层直接透传 */
export class FsError extends Error {
  constructor(
    message: string,
    public readonly wireCode: string = ErrorCode.FsError,
    public readonly status: number = 400,
  ) {
    super(message);
    this.name = "FsError";
  }
}
