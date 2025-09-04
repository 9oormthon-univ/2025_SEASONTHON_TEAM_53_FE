import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

// 폼 입력값의 타입을 정의합니다.
interface IFormInput {
  email: string;
  password_1: string;
  password_2: string;
  nickname: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // 폼 제출 로직 (백엔드로 데이터 전송)
    console.log('회원가입 정보:', data);
    alert('회원가입이 완료되었습니다!');
  };

  const onClosed = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <Header>
        <h1>회원가입</h1>
        <CloseButton onClick={onClosed} />
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputSection>
          <Label htmlFor="email">이메일</Label>
          <InputWrapper>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              hasError={!!errors.email}
            />
            <SideButton type="button">중복 확인</SideButton>
          </InputWrapper>
          <ValidationMessage hasError={!!errors.email}>
            {errors.email ? errors.email.message : '사용 가능한 이메일입니다.'}
          </ValidationMessage>
        </InputSection>

        <InputSection>
          <Label htmlFor="password_1">비밀번호</Label>
          <InputDescription>*6-20자/영문, 숫자, 특수문자 중 2가지 이상 조합</InputDescription>
          <InputWrapper>
            <Input
              id="password_1"
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register('password_1', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{6,20}$/,
                  message: '영문, 숫자, 특수문자 중 2가지 이상 조합해주세요.',
                },
              })}
              hasError={!!errors.password_1}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              id="password_2"
              type="password"
              placeholder="비밀번호를 다시 한번 입력하세요"
              {...register('password_2', {
                required: '비밀번호를 다시 한번 입력해주세요.',
                validate: (value) => value === watch('password_1') || '비밀번호가 일치하지 않습니다.',
              })}
              hasError={!!errors.password_2}
            />
          </InputWrapper>
          <ValidationMessage hasError={!!errors.password_2}>
            {errors.password_2 ? errors.password_2.message : '비밀번호가 일치합니다.'}
          </ValidationMessage>
        </InputSection>

        <InputSection>
          <Label htmlFor="nickname">닉네임</Label>
          <InputDescription>*2-20자 영문, 한글 입력 가능</InputDescription>
          <InputWrapper>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
              })}
              hasError={!!errors.nickname}
            />
          </InputWrapper>
          <ValidationMessage hasError={!!errors.nickname}>
            {errors.nickname ? errors.nickname.message : '사용 가능한 닉네임입니다.'}
          </ValidationMessage>
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
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h1 {
    font-size: 1.2rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
    margin-left: 24px; // 아이콘 크기만큼 왼쪽 여백
  }
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputSection = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 8px;
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

  ${(props) =>
    props.hasError &&
    css`
      border-color: #ff5d5d;
    `}
`;

const SideButton = styled.button`
  padding: 0 16px;
  background-color: #5a67d8;
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const ValidationMessage = styled.p<{ hasError?: boolean }>`
  font-size: 0.8rem;
  margin-top: 8px;
  color: ${(props) => (props.hasError ? '#FF5D5D' : '#34D399')};
`;

const SubmitButton = styled.button`
  margin-top: auto;
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
