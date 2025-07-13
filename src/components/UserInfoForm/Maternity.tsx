import { useState } from 'react';
import { CheckBox } from '../Input/CheckField/Checkbox';

export default function Maternity() {
  const [relation, setRelation] = useState('임산부');
  const [gender, setGender] = useState('여성');

  return (
    <form>
      <div>
        <span>관계 선택</span>
        <CheckBox
          label="임산부"
          name="relation"
          value="임산부"
          checked={relation === '임산부'}
          onClick={() => setRelation('임산부')}
        />
        <CheckBox
          label="보호자"
          name="relation"
          value="보호자"
          checked={relation === '보호자'}
          onClick={() => setRelation('보호자')}
        />
      </div>
      <div>
        <span>성별</span>
        <CheckBox
          label="여성"
          name="gender"
          value="여성"
          checked={gender === '여성'}
          onClick={() => setGender('여성')}
        />
        <CheckBox
          label="남성"
          name="gender"
          value="남성"
          checked={gender === '남성'}
          onClick={() => setGender('남성')}
        />
        <CheckBox
          label="기타"
          name="gender"
          value="기타"
          checked={gender === '기타'}
          onClick={() => setGender('기타')}
        />
      </div>
    </form>
  );
}