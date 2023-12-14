package com.bluejeans.server.dto;

import com.bluejeans.server.entity.DibResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@AllArgsConstructor
@Getter
public class DibResultDTO {
    private long counts;
    private DibResult dibResult;
}
