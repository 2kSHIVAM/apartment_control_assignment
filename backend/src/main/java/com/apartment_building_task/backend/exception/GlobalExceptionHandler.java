package com.apartment_building_task.backend.exception;

import com.apartment_building_task.backend.dto.ApiResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BuildingAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> handleAlreadyExists(BuildingAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // 409
                .body(new ApiResponse<>(ex.getMessage(), null));
    }

    @ExceptionHandler(BuildingNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(BuildingNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND) // 404
                .body(new ApiResponse<>(ex.getMessage(), null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationErrors(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .findFirst()
                .orElse("Invalid input");
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>(errorMessage, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR) // 500
                .body(new ApiResponse<>("Unexpected error: " + ex.getMessage(), null));
    }
}

