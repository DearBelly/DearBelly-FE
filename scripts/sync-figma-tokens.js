const fs = require('fs');
const path = require('path');

// 피그마 API를 사용하여 토큰을 가져오는 함수
async function syncFigmaTokens() {
  const configPath = path.join(__dirname, '../figma-tokens.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  const { figmaPersonalAccessToken, figmaFileKey, figmaNodeId } = config;
  
  if (!figmaPersonalAccessToken || !figmaFileKey) {
    console.error('피그마 토큰과 파일 키를 설정해주세요.');
    return;
  }

  try {
    // 피그마 API 호출
    const response = await fetch(`https://api.figma.com/v1/files/${figmaFileKey}/nodes?ids=${figmaNodeId}`, {
      headers: {
        'X-Figma-Token': figmaPersonalAccessToken
      }
    });

    if (!response.ok) {
      throw new Error(`피그마 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log('피그마에서 토큰을 성공적으로 가져왔습니다.');
    
    // 토큰 데이터를 파일에 저장
    const tokensPath = path.join(__dirname, '../DearBelly-FE/styles/Tokens.json');
    fs.writeFileSync(tokensPath, JSON.stringify(data, null, 2));
    
    console.log('토큰이 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('토큰 동기화 중 오류 발생:', error);
  }
}

syncFigmaTokens(); 