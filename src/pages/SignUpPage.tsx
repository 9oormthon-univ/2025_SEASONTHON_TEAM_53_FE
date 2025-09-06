import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// 1. 폼 데이터 타입을 새로운 디자인에 맞게 변경합니다.
interface IFormInput {
  nickname: string;
  job: string;
  tendency: string;
}

// 드롭다운 옵션
const JOB_OPTIONS = ['개발', '디자인', '기획', '마케팅', '기타'];
const TENDENCY_OPTIONS = ['외향', '내향'];

export default function SignupPage() {
  const navigate = useNavigate();
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isTendencyOpen, setIsTendencyOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue, // setValue를 가져와 커스텀 컴포넌트 값을 설정합니다.
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: { nickname: '', job: '', tendency: '' }, // 기본값 설정
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('프로필 정보:', data);
    // alert('프로필 설정이 완료되었습니다!'); // alert는 UX를 위해 제거하는 것이 좋습니다.

    // MyDayPage의 경로인 '/today-arcana'로 이동시킵니다.
    navigate('/today-arcana');
  };

  // react-hook-form에 값을 등록하고 드롭다운을 닫는 함수
  const handleOptionClick = (field: 'job' | 'tendency', value: string, closeDropdown: () => void) => {
    setValue(field, value, { shouldValidate: true }); // 값을 설정하고 유효성 검사 실행
    closeDropdown();
  };

  return (
    <PageContainer>
      <Header>
        <h1>환영합니다!</h1>
        <p>정보를 입력하고 taroutine을 사용해 보세요.</p>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* --- 닉네임 입력 섹션 --- */}
        <InputSection>
          <Label htmlFor="nickname">닉네임</Label>
          <InputDescription>*2-20자 영문, 한글 입력 가능</InputDescription>
          <InputWrapper>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                minLength: { value: 2, message: '2자 이상 입력해주세요.' },
                maxLength: { value: 20, message: '20자 이하로 입력해주세요.' },
              })}
              hasError={!!errors.nickname}
            />
          </InputWrapper>
          {errors.nickname && <ValidationMessage>{errors.nickname.message}</ValidationMessage>}
        </InputSection>

        {/* --- 직업 선택 드롭다운 --- */}
        <InputSection>
          <Label>직업</Label>
          <DropdownContainer>
            <DropdownHeader onClick={() => setIsJobOpen(!isJobOpen)} $isSelected={!!watch('job')}>
              {watch('job') || '직업을 선택해 주세요.'}
              <ArrowIcon $isOpen={isJobOpen} />
            </DropdownHeader>
            <AnimatePresence>
              {isJobOpen && (
                <DropdownList
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {JOB_OPTIONS.map((option) => (
                    <DropdownOption
                      key={option}
                      onClick={() => handleOptionClick('job', option, () => setIsJobOpen(false))}
                    >
                      {option}
                    </DropdownOption>
                  ))}
                </DropdownList>
              )}
            </AnimatePresence>
          </DropdownContainer>
        </InputSection>

        {/* --- 성향 선택 드롭다운 --- */}
        <InputSection>
          <Label>성향</Label>
          <DropdownContainer>
            <DropdownHeader onClick={() => setIsTendencyOpen(!isTendencyOpen)} $isSelected={!!watch('tendency')}>
              {watch('tendency') || '성향을 선택해 주세요.'}
              <ArrowIcon $isOpen={isTendencyOpen} />
            </DropdownHeader>
            <AnimatePresence>
              {isTendencyOpen && (
                <DropdownList
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {TENDENCY_OPTIONS.map((option) => (
                    <DropdownOption
                      key={option}
                      onClick={() => handleOptionClick('tendency', option, () => setIsTendencyOpen(false))}
                    >
                      {option}
                    </DropdownOption>
                  ))}
                </DropdownList>
              )}
            </AnimatePresence>
          </DropdownContainer>
        </InputSection>

        <SubmitButton type="submit" disabled={!isValid}>
          완료
        </SubmitButton>
      </Form>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #121212;
  color: white;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin-top: 40px;
  margin-bottom: 40px;
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 15px;
  }
  p {
    font-size: 1rem;
    color: #888;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
`;

const InputSection = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 8px;
  /* margin-top: 10px; */
`;

const InputDescription = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-left: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  flex: 1;
  padding: 14px;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  margin-top: 10px;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #ff5d5d;
    `}
`;

const ValidationMessage = styled.p<{ hasError?: boolean }>`
  font-size: 0.8rem;
  margin-top: 8px;
  color: ${(props) => (props.hasError ? '#FF5D5D' : '#6C6FDF')};
`;

const SubmitButton = styled.button`
  margin-top: auto;
  margin-bottom: 50px;
  padding: 16px;
  width: 100%;
  border-radius: 12px;
  background-color: #5a67d8;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;

  &:disabled {
    background-color: #444;
    color: #888;
  }
`;

// --- 드롭다운을 위한 새로운 Styled Components ---
const DropdownContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

const DropdownHeader = styled.div<{ $isSelected: boolean }>`
  padding: 14px;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  color: ${(props) => (props.$isSelected ? 'white' : '#888')};
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ArrowIcon = styled.div<{ $isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #888;
  transition: transform 0.2s ease-in-out;
  transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownList = styled(motion.ul)`
  position: absolute;
  width: 100%;
  top: calc(100% + 4px);
  left: 0;
  background-color: #2d2d2d;
  border: 1px solid #444;
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownOption = styled.li`
  padding: 12px 14px;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a67d8;
  }
`;
