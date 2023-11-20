package com.bluejeans.server.service;

import com.bluejeans.server.dto.RecruitDTO;
import com.bluejeans.server.entity.RecruitEntity;
import com.bluejeans.server.repository.RecruitRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecruitServiceTest {

    @InjectMocks  // 테스트 대상 객체에 주입할 Mock 객체를 생성하고 주입
    private RecruitService recruitService;

    @Mock  // Mock 객체를 생성
    private RecruitRepository recruitRepository;

    @Test
    @DisplayName("Create 성공")
    void testRegisterRecruitSuccess() {
        // 가짜 데이터로 테스트
        RecruitDTO recruitDTO = RecruitDTO.builder()
                .title("제목")
                .content("내용")
                .money(10000)
                .region("서울")
                .contact("010-1234-5678")
                .build();

        // Mockito.when(): 특정 메서드가 호출될 때의 동작을 정의, 예를 들어, 메서드 호출 시 특정 값을 반환하도록 지정
        // save 메서드의 반환값은 가짜 mock 데이터
        Mockito.when(recruitRepository.save(Mockito.any(RecruitEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // 등록 시도
        boolean result = recruitService.registerRecruit(recruitDTO);

        // 등록이 성공했으므로 true를 기대
        assertTrue(result);
    }

    @Test
    @DisplayName("Create 실패")
    void testRegisterRecruitFailure() {
        // 가짜 데이터로 테스트
        RecruitDTO recruitDTO = RecruitDTO.builder()
                .title("제목")
                .content("내용")
                .money(10000)
                .region("서울")
                .contact("010-1234-5678")
                .build();

        // save 메서드가 예외를 던지도록 설정
        Mockito.when(recruitRepository.save(Mockito.any(RecruitEntity.class))).thenThrow(new RuntimeException("Database error"));

        // 등록 시도
        boolean result = recruitService.registerRecruit(recruitDTO);

        // 등록이 실패했으므로 false를 기대
        assertFalse(result);
    }

    @Test
    @DisplayName("Read 성공")
    void testRecruitDetailSuccess() {
        // 가짜 데이터로 테스트
        int id = 1;
        RecruitEntity recruitEntity = RecruitEntity.builder()
                .id(id)
                .title("제목")
                .content("내용")
                .money(10000)
                .region("서울")
                .contact("010-1234-5678")
                .build();

        // findById가 존재하는 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.of(recruitEntity));

        // 상세 조회 시도
        RecruitDTO result = recruitService.recruitDetail(id);

        // 상세 조회가 성공했으므로 DTO를 기대
        assertNotNull(result);
        assertEquals(id, result.getId());
    }

    @Test
    @DisplayName("Read 실패")
    void testRecruitDetailFailure() {
        // 가짜 데이터로 테스트
        int id = 1;

        // findById가 빈 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.empty());

        // 상세 조회 시도
        RecruitDTO result = recruitService.recruitDetail(id);

        // 상세 조회가 실패했으므로 null을 기대
        assertNull(result);
    }

    @Test
    @DisplayName("Update 성공")
    void testEditRecruitSuccess() {
        // 가짜 데이터로 테스트
        int id = 1;
        RecruitDTO recruitDTO = RecruitDTO.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .money(20000)
                .region("부산")
                .contact("010-5678-1234")
                .build();

        RecruitEntity existingEntity = RecruitEntity.builder()
                .id(id)
                .title("기존 제목")
                .content("기존 내용")
                .money(10000)
                .region("서울")
                .contact("010-1234-5678")
                .build();

        // findById가 존재하는 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.of(existingEntity));

        // save 메서드가 호출될 때 매개변수로 전달된 값을 확인하도록 설정
        Mockito.when(recruitRepository.save(Mockito.any(RecruitEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // 수정 시도
        boolean result = recruitService.editRecruit(id, recruitDTO);

        // 수정이 성공했으므로 true를 기대
        assertTrue(result);

        // 수정된 엔티티의 값을 확인
        RecruitEntity updatedEntity = recruitRepository.findById(id).orElse(null);
        assertNotNull(updatedEntity);
        assertEquals(recruitDTO.getTitle(), updatedEntity.getTitle());
        assertEquals(recruitDTO.getContent(), updatedEntity.getContent());
        assertEquals(recruitDTO.getMoney(), updatedEntity.getMoney());
        assertEquals(recruitDTO.getRegion(), updatedEntity.getRegion());
        assertEquals(recruitDTO.getContact(), updatedEntity.getContact());
    }
    @Test
    @DisplayName("Update 실패")
    void testEditRecruitFailure() {
        // 가짜 데이터로 테스트
        int id = 1;
        RecruitDTO recruitDTO = RecruitDTO.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .money(20000)
                .region("부산")
                .contact("010-5678-1234")
                .build();

        // findById가 빈 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.empty());

        // 수정 시도
        boolean result = recruitService.editRecruit(id, recruitDTO);

        // 수정이 실패했으므로 false를 기대
        assertFalse(result);
    }

    @Test
    @DisplayName("Delete 성공")
    void testDeleteRecruitSuccess() {
        // 가짜 데이터로 테스트
        int id = 1;
        RecruitEntity recruitEntity = RecruitEntity.builder()
                .id(id)
                .title("제목")
                .content("내용")
                .money(10000)
                .region("서울")
                .contact("010-1234-5678")
                .build();

        // findById가 존재하는 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.of(recruitEntity));

        // deleteById 메서드가 호출될 때 매개변수로 전달된 값을 확인하도록 설정
        Mockito.doNothing().when(recruitRepository).deleteById(id);

        // 삭제 시도
        boolean result = recruitService.deleteRecruit(id);

        // 삭제가 성공했으므로 true를 기대
        assertTrue(result);
    }

    @Test
    @DisplayName("Delete 실패")
    void testDeleteRecruitFailure() {
        // 가짜 데이터로 테스트
        int id = 1;

        // findById가 빈 Optional을 반환하도록 설정
        Mockito.when(recruitRepository.findById(id)).thenReturn(Optional.empty());

        // 삭제 시도
        boolean result = recruitService.deleteRecruit(id);

        // 삭제가 실패했으므로 false를 기대
        assertFalse(result);
    }
}