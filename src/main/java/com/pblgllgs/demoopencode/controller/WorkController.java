package com.pblgllgs.demoopencode.controller;

import com.pblgllgs.demoopencode.model.Work;
import com.pblgllgs.demoopencode.service.WorkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/works")
public class WorkController {

    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @GetMapping
    public ResponseEntity<List<Work>> findAll() {
        return ResponseEntity.ok(workService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Work> findById(@PathVariable Long id) {
        return ResponseEntity.ok(workService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Work> create(@RequestBody Work work) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workService.create(work));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Work>> createAll(@RequestBody List<Work> works) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workService.createAll(works));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Work> update(@PathVariable Long id, @RequestBody Work work) {
        return ResponseEntity.ok(workService.update(id, work));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        workService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
