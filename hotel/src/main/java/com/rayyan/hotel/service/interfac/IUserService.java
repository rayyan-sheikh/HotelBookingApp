package com.rayyan.hotel.service.interfac;

import com.rayyan.hotel.dto.LoginRequest;
import com.rayyan.hotel.dto.Response;
import com.rayyan.hotel.entity.User;

public interface IUserService {

    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
