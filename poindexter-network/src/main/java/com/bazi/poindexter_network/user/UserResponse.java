package com.bazi.poindexter_network.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class UserResponse {

    private String firstName;
    private String email;
    private boolean accountLocked;
    private boolean enabled;

}