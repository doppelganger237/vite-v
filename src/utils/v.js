import { getById } from "@/api/user";

/**
 * 处理表单中的用户ID
 * @param {Array} originalForm 原始表单数据
 */
export async function standardizeForm(originalForm) {
  // 用户ID和Name的对应MAP
  const nameMap = new Map();
  // 异步遍历,用.()会导致执行顺序不太对
  for await (const r of originalForm) {
    // 如果表格数据中存在创造者id则添加用户名数据
    if (r.creatorId) {
      // 少打点字
      const userId = r.creatorId;
      // 是否已经缓存
      if (nameMap.has(userId)) {
        r.username = nameMap.get(userId);
      } else {
        const res = await getById(userId);
        const { username } = res.data;
        nameMap.set(userId, username);
        r.username = username;
      }
    }
  }
}
