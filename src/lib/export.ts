import { toPng } from 'html-to-image';
import { CardAspectRatio } from '@/types/github';

// 基准宽度
const BASE_WIDTH = 512;

// 根据比例计算高度
function calculateHeight(width: number, aspectRatio: CardAspectRatio): number {
  switch (aspectRatio) {
    case '2:1':
      return width / 2;
    case '16:9':
      return (width * 9) / 16;
    case '4:3':
      return (width * 3) / 4;
    case '1:1':
      return width;
    default:
      return width / 2;
  }
}

export async function exportToImage(element: HTMLElement, aspectRatio: CardAspectRatio): Promise<string> {
  try {
    // 计算目标尺寸
    const targetWidth = BASE_WIDTH;
    const targetHeight = calculateHeight(BASE_WIDTH, aspectRatio);
    
    // 克隆元素以避免修改原始元素
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = `${targetWidth}px`;
    clone.style.height = `${targetHeight}px`;
    
    // 确保所有图片都加载完成
    const images = Array.from(clone.getElementsByTagName('img'));
    await Promise.all(
      images.map(img => 
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        })
      )
    );
    
    // 等待字体加载
    await document.fonts.ready;
    
    // 导出为PNG
    const dataUrl = await toPng(clone, {
      width: targetWidth,
      height: targetHeight,
      quality: 1.0,
      pixelRatio: 2,
      skipAutoScale: true,
      filter: (node) => {
        if (node instanceof HTMLElement) {
          node.style.transform = 'none';
          node.style.transformOrigin = 'center';
        }
        return true;
      }
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export card');
  }
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCard(cardElement: HTMLElement, username: string, aspectRatio: CardAspectRatio) {
  try {
    const dataUrl = await exportToImage(cardElement, aspectRatio);
    downloadImage(dataUrl, `${username}-github-card.png`);
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
} 