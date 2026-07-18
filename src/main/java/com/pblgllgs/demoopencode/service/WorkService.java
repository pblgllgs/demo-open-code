package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.model.Work;
import com.pblgllgs.demoopencode.repository.WorkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkService {

    private final WorkRepository workRepository;

    public WorkService(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    public List<Work> findAll() {
        return workRepository.findAll();
    }

    public Work findById(Long id) {
        return workRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work not found with id: " + id));
    }

    public Work create(Work work) {
        return workRepository.save(work);
    }

    public List<Work> createAll(List<Work> works) {
        return workRepository.saveAll(works);
    }

    public Work update(Long id, Work updated) {
        Work work = findById(id);
        work.setTitle(updated.getTitle());
        work.setDescription(updated.getDescription());
        work.setCategory(updated.getCategory());
        work.setTags(updated.getTags());
        work.setCodeLink(updated.getCodeLink());
        work.setProjectLink(updated.getProjectLink());
        work.setImgUrl(updated.getImgUrl());
        return workRepository.save(work);
    }

    public void delete(Long id) {
        workRepository.deleteById(id);
    }

    public void deleteAll() {
        workRepository.deleteAll();
    }
}
