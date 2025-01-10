import { fetch, go } from "../../../index";
import { genCapaPostDeeplink } from './capa'

const filterPageIds = (ids: string) => {
    const pageIds = ids.split(',').filter((id: string) => id.trim() !== '')
    return pageIds.map(pageId => ({ page_id: pageId.trim() }))
}
export class PublishNotesTask  {
  //    发布笔记
  publish(pageId: string){
    console.log('pageId', pageId)
    const publishNotePage = genCapaPostDeeplink({
      attach: { topics: filterPageIds(pageId as string) },
      config: {
        is_post_jump: 0,
      },
    })
    console.log('publishNotePage', publishNotePage);
    go(publishNotePage, {
      type: 'deeplink',
      fail: (err)=>{
        console.log('error', err)
      }
    })
    return 1
  }
}
